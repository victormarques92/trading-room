import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-6 border-t border-zinc-700 px-6 py-4 text-center text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()} Trading Room. Criado com{' '}
        <span role="img" aria-label="amor">
          💙
        </span>{' '}
        por{' '}
        <Link
          href="https://github.com/victormarques92"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline-offset-2 transition-colors duration-200 hover:text-blue-500 hover:underline"
          aria-label="Perfil de Victor Marques no GitHub"
        >
          Victor Marques
        </Link>
        .
      </p>
    </footer>
  );
};
