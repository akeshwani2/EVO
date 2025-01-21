export default function WelcomeMessage() {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-10">
        <div className="bg-zinc-800 rounded-2xl shadow-sm ring-1 ring-inset ring-white/20 px-6 py-5 max-w-lg w-full text-white">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to EVO
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            I can help you with:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Finding and analyzing YouTube video transcripts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Searching through Google Books</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Processing data with JSONata</span>
            </li>
          </ul>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Feel free to ask me anything! I&apos;m here to help.
          </p>
        </div>
      </div>
    );
  }