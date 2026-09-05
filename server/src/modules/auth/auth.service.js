import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";
import { jwtExpiresIn, jwtSecret } from "../../config/env.js";
const fail = (message, statusCode) =>
  Object.assign(new Error(message), { statusCode });
const publicUser = (user) => ({
  id: user.id,
  loginId: user.loginId,
  email: user.email,
  role: user.role,
  contactId: user.contactId,
});
const tokenFor = (user) =>
  jwt.sign(
    { userId: user.id, role: user.role, contactId: user.contactId },
    jwtSecret,
    { expiresIn: jwtExpiresIn },
  );
export async function signup({ loginId, email, password }) {
  if (!loginId || !email || !password)
    throw fail("loginId, email, and password are required", 400);
  if (password.length < 8)
    throw fail("Password must be at least 8 characters", 400);
  if (await prisma.user.findFirst({ where: { OR: [{ loginId }, { email }] } }))
    throw fail("A user with that loginId or email already exists", 409);
  const user = await prisma.user.create({
    data: {
      loginId,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "INVOICING_USER",
    },
  });
  return { user: publicUser(user), token: tokenFor(user) };
}
export async function login({ loginId, email, password }) {
  if ((!loginId && !email) || !password)
    throw fail("loginId or email and password are required", 400);
  const user = await prisma.user.findFirst({
    where: loginId ? { loginId } : { email },
  });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    throw fail("Invalid credentials", 401);
  if (user.status !== "ACTIVE") throw fail("User account is inactive", 403);
  return { user: publicUser(user), token: tokenFor(user) };
}
export async function createUser({
  loginId,
  email,
  password,
  role,
  contactId,
}) {
  if (!loginId || !email || !password || !role)
    throw fail("loginId, email, password, and role are required", 400);
  if (!["ADMIN", "INVOICING_USER", "CONTACT"].includes(role))
    throw fail("Invalid role", 400);
  if (role === "CONTACT" && !contactId)
    throw fail("contactId is required for CONTACT users", 400);
  if (role !== "CONTACT" && contactId)
    throw fail("contactId is only allowed for CONTACT users", 400);
  if (await prisma.user.findFirst({ where: { OR: [{ loginId }, { email }] } }))
    throw fail("A user with that loginId or email already exists", 409);
  if (
    contactId &&
    !(await prisma.contact.findUnique({ where: { id: Number(contactId) } }))
  )
    throw fail("Contact not found", 404);
  const user = await prisma.user.create({
    data: {
      loginId,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role,
      contactId: contactId ? Number(contactId) : null,
    },
  });
  return publicUser(user);
}
