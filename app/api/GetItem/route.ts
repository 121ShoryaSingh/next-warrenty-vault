import { NextResponse } from 'next/server';
import { auth } from '../(auth)/[...nextauth]/auth';
import User from '@/model/User';
import Item from '@/model/Item';

export default async function GET() {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const items = await Item.find({ owner: user._id });

    return NextResponse.json(
      {
        message:
          items.length > 0 ? 'Items fetched successfully' : 'No items found',
        items: items,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching items', error);
    return NextResponse.json(
      { message: 'Error fetching items' },
      { status: 500 }
    );
  }
}
