import prisma from '../../config/prisma.js';

import bcrypt from 'bcryptjs';

export const createContact = async (req, res, next) => {
  try {
    const { name, type, email, mobile, addressCity, addressState, addressPincode } = req.body;
    let profileImage = null;

    if (req.file) {
      profileImage = req.file.path.split('src')[1].replace(/\\/g, '/'); // e.g. /uploads/contacts/file.jpg
    }

    // Use a transaction to ensure both Contact and User are created atomically
    const result = await prisma.$transaction(async (tx) => {
      const contact = await tx.contact.create({
        data: {
          name,
          type,
          email,
          mobile,
          addressCity,
          addressState,
          addressPincode,
          profileImage
        }
      });

      // If the contact is a CUSTOMER, automatically create a User for them to login
      if (type === 'CUSTOMER') {
        const loginId = name.toLowerCase().replace(/\s+/g, '');
        const plainPassword = mobile && mobile.trim() !== '' ? mobile : 'password123';
        const passwordHash = await bcrypt.hash(plainPassword, 10);

        // Check if loginId already exists to avoid conflict
        let uniqueLoginId = loginId;
        let counter = 1;
        while (await tx.user.findUnique({ where: { loginId: uniqueLoginId } })) {
          uniqueLoginId = `${loginId}${counter}`;
          counter++;
        }

        await tx.user.create({
          data: {
            loginId: uniqueLoginId,
            email: email || `${uniqueLoginId}@example.com`, // Email is unique in User model, so ensure it's not null/duplicated if missing
            passwordHash,
            role: 'CONTACT',
            contactId: contact.id
          }
        });
      }

      return contact;
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { type } = req.query;
    const where = type ? { type } : {};
    
    const contacts = await prisma.contact.findMany({ where });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, email, mobile, addressCity, addressState, addressPincode, status } = req.body;
    
    let profileImage = undefined;
    if (req.file) {
      profileImage = req.file.path.split('src')[1].replace(/\\/g, '/');
    }

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        email,
        mobile,
        addressCity,
        addressState,
        addressPincode,
        status,
        ...(profileImage && { profileImage })
      }
    });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const getMyInvoices = async (req, res, next) => {
  try {
    const { contactId, role } = req.user;
    if (role === 'CONTACT' && !contactId) return res.status(403).json({ error: 'No contact associated with this user' });
    
    // For admin/invoicing user, this endpoint might just return all, or we could restrict it purely to CONTACT users
    // Requirements state: Restrict self-service invoice/bill lists to req.user.contactId
    const invoices = await prisma.customerInvoice.findMany({
      where: role === 'CONTACT' ? { customerId: contactId } : {},
      include: { lines: true }
    });
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getMyBills = async (req, res, next) => {
  try {
    const { contactId, role } = req.user;
    if (role === 'CONTACT' && !contactId) return res.status(403).json({ error: 'No contact associated with this user' });
    
    const bills = await prisma.vendorBill.findMany({
      where: role === 'CONTACT' ? { vendorId: contactId } : {},
      include: { lines: true }
    });
    res.json(bills);
  } catch (error) {
    next(error);
  }
};
