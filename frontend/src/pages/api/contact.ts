// pages/api/contact.ts

import { Axios } from '~/utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { data } = await Axios.post(`/enquiry`, req.body);
    if (data?.success) {
      return res.status(200).json({ success: true });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error occurred while processing the request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
