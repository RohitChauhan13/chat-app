import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useCoversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
	const {authUser}= useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message.senderId === authUser._id
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const formattedTime = extractTime(message.createdAt);
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";


	return (
		<div className={`chat ${chatClassName}`}>
		<div className="flex items-center justify-end">
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{message.message}
			</div>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt='Profile Pic' src={profilePic} />
				</div>
			</div>
		</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
	</div>
	);
};
export default Message;