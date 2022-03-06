import ModalItem from '../Modal/ModalItem';
import { deleteUser } from 'firebase/auth';
import { auth } from '../../firebase';
import toast, { Toaster } from 'react-hot-toast';

const ModalDelete = ({ openmodal, deletemodalHandler }) => {

    const deleteAccountHandler = e => {
        e.preventDefault();
        deleteUser(auth.currentUser).then(() => {
            console.log("deleted account")
        }).catch(e => {
            if (e.code === "auth/requires-recent-login") {
                toast.error("You need to login again to delete this account")
            }
        })
    }

    return (
        <div onClick={deletemodalHandler} openmodal={`${openmodal}`} >
            {/* <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button> */}
            {openmodal && (
                <>
                    <ModalItem title="Delete Account" content="Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone." actiononclick={deleteAccountHandler} cancelonclick={openmodal => !openmodal} actiontext="delete" canceltext="cancel" />
                </>
            )}
            <Toaster position="top-center" />
        </div>

    )
}

export default ModalDelete
