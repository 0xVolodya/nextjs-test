let object = {
  title: "Photo gallery",
  description: "A selection of the latest photos from our restaurant and some of our favorite dishes",
  images: []
}

export default function handler(req, res) {
  const {
    method,
    body
  } = req
  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(object)
      break
    case 'POST':
      // Update or create data in your database
      object = body
      res.status(200).json({message: 'success'})
      break
    case 'DELETE':
      // Update or create data in your database
      object.images = []
      res.status(200).json({message: 'success'})
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1000mb',
    },
  },
}
