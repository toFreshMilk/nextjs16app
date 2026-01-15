interface Props {
  title: string;
}

export function LoginHeader({ title }: Props) {
  return (
    <div className="text-center mb-8">
      <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
        B
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-2 text-sm">Enterprise Legal Management</p>
    </div>
  );
}

