import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'



export async function GET(
  request: Request,
  { params }: { params: { filename: string } },
) {
  try {
    const filename = params.filename
    // Validate filename to prevent directory traversal attacks
    if (!filename.match(/^[a-zA-Z0-9-]+$/)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filePath = path.join(
      process.cwd(),
      'components',
      'templates',
      `${filename}.tsx`,
    )

    const fileContents = await fs.readFile(filePath, 'utf8')
    return NextResponse.json({ content: fileContents })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}


export async function POST(
  request: Request,
  { params }: { params: { filename: string } },
) {
  try {
    const filename = params.filename
    // Validate filename to prevent directory traversal attacks
    if (!filename.match(/^[a-zA-Z0-9-]+$/)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filePath = path.join(
      process.cwd(),
      'components',
      'templates',
      `${filename}.tsx`,
    )

    const { content } = await request.json()
    await fs.writeFile(filePath, content, 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 })
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { filename: string } },
) {
  try {
    const filename = params.filename
    // Validate filename to prevent directory traversal attacks
    if (!filename.match(/^[a-zA-Z0-9-]+$/)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filePath = path.join(
      process.cwd(),
      'components',
      'templates',
      `${filename}.tsx`,
    )

    await fs.unlink(filePath)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}


export async function PUT(
  request: Request,
  { params }: { params: { filename: string } },
) {
  try {
    const filename = params.filename
    // Validate filename to prevent directory traversal attacks
    if (!filename.match(/^[a-zA-Z0-9-]+$/)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filePath = path.join(
      process.cwd(),
      'components',
      'templates',
      `${filename}.tsx`,
    )

    const { content } = await request.json()
    await fs.appendFile(filePath, content, 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to append file' }, { status: 500 })
  }
}