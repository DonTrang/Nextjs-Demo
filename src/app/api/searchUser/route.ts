import { NextApiRequest, NextApiResponse } from 'next'; // Import kiểu dữ liệu Next.js
import prisma from '../../../lib/prisma'; // 3 cấp trên để đến thư mục src/lib
 // Import prisma client

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Kiểm tra nếu phương thức là GET
  if (req.method === 'GET') {
    const { username } = req.query; // Lấy tham số từ query (ví dụ: ?username=xyz)

    if (!username || Array.isArray(username)) {
      return res.status(400).json({ error: 'Username is required and must be a string' });
    }

    try {
      // Tìm kiếm người dùng trong database
      const user: User | null = await prisma.user.findUnique({
        where: {
          username: username, // Tìm kiếm theo username
        },
      });

      // Nếu tìm thấy người dùng
      if (user) {
        return res.status(200).json(user);
      }

      // Nếu không tìm thấy người dùng
      return res.status(404).json({ message: 'Không thấy người dùng' });
    } catch (error) {
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm' });
    }
  } else {
    // Nếu phương thức không phải GET
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
