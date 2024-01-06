import { UAPI } from 'alloy-node';

const YOUR_API_KEY = process.env.ALLOY_API_KEY;

export default async function handler(req, res) {
  const { method } = req;
  const connectionId = req.query.connectionId;

  if (!connectionId) {
    return res.status(400).json({ error: 'ConnectionId is required' });
  }

  const apiClient = new UAPI(YOUR_API_KEY);
  apiClient.CRM.connect(connectionId);
  switch (method) {
    case 'GET':
      try {
        const contacts = await apiClient.CRM.listContacts();
        res.json(contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Error fetching contacts' });
      }
      break;

    case 'POST':
      try {
        const contactData = req.body;
        const newContact = await apiClient.CRM.createContact(contactData);
        res.json(newContact);
      } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Error creating contact' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
