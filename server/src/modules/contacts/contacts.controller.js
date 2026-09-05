import prisma from '../../config/prisma.js';

export const createContact = async (req, res, next) => {
  try {
    const { name, type, email, mobile, addressCity, addressState, addressPincode } = req.body;
    let profileImage = null;

    if (req.file) {
      profileImage = req.file.path.split('src')[1].replace(/\\/g, '/'); // e.g. /uploads/contacts/file.jpg
    }

    const contact = await prisma.contact.create({
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

    res.status(201).json(contact);
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
