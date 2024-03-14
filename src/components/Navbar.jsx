import useUserStore from '@/store/UserStore'

const Navbar = () => {

    const {preference, changePreference} = useUserStore();
    const changeHandler = (e) => {
        changePreference({...preference, lang: preference.lang})
    }

  return (
    <div className="toast toast-top toast-end">
        <div className="alert alert-info">
            <select className="select select-sm select-bordered w-full max-w-xs" onChange={changeHandler}>
                <option value={"en-US"} defaultValue={true}>English</option>
                <option value={"hn-IN"}>Hindi</option>
                <option disabled>Bangla</option>
            </select>

        </div>
    </div>
  )
}

export default Navbar