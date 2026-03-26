export interface Contact {
  id: string;
  name: string;
  email: string;
}

const globalStore = global as unknown as { contacts: Contact[] };

if (!globalStore.contacts) {
  globalStore.contacts = [
    { id: '52bf52a2-5e3d-4c3e-8b1b-7a39b36d0e80', name: 'John Doe', email: 'john@example.com' },
    { id: '18a4d2c8-2b81-4b1f-9c8f-3d02b8a7c2e1', name: 'Jane Smith', email: 'jane@example.com' }
  ];
}

export const getContacts = () => globalStore.contacts;

export const addContact = (contact: Contact) => {
  globalStore.contacts.push(contact);
};

export const deleteContact = (id: string) => {
  globalStore.contacts = globalStore.contacts.filter((c) => c.id !== id);
};
