import { Dispatch, SetStateAction } from "react";

interface ChangeButtonProps {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>
    handleSave: () => void;
}

const ChangeCarButtons: React.FC<ChangeButtonProps> = ({isEditing, setIsEditing, handleSave}) => {
  return (
    <>
        {isEditing ? (
            <>
                <button onClick={handleSave}>Сохранить изменения</button>
                <button onClick={() => setIsEditing(false)}>Отменить изменения</button>
            </>
        ) : (
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
        )}
    </>
  )
}

export default ChangeCarButtons