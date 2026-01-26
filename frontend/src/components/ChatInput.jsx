const ChatInput = () => {
  return (
    <div className="p-6 w-full flex justify-center">
      <div className="relative w-full max-w-3xl">
        <input 
          type="text" 
          placeholder="Ask me anything about fashion, styling, outfits..."
          className="w-full p-4 pr-14 rounded-full border-none shadow-lg focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <button className="absolute right-3 top-2 p-2 bg-[#FF4DAD] text-white rounded-full hover:bg-pink-600">
          ✈️
        </button>
      </div>
    </div>
  );
};

export default ChatInput;