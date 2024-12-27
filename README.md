# API Key Management Dashboard

A Next.js application that provides a secure dashboard for managing API keys. Users can generate, view, edit and delete API keys with usage limits. The application includes authentication, dark/light theme support, and real-time updates.

## Features

- User authentication with Supabase
- Generate new API keys with custom names and usage limits
- View and manage existing API keys
- Copy API keys to clipboard
- Toggle key visibility for security
- Dark/light theme support
- Usage tracking and statistics
- Responsive design

## Prerequisites

- Node.js 16.x or later
- npm or yarn package manager
- Supabase account and project

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/shisukeUrahara/cursor-api-key-manager.git
   cd cursor-api-key-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

api-key-management/
├── components/ # React components
├── pages/ # Next.js pages
├── public/ # Static assets
├── styles/ # CSS styles
├── lib/ # Utility functions
└── types/ # TypeScript type definitions


## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend and authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React Query](https://react-query.tanstack.com/) - Data fetching
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact [your-email@example.com].



