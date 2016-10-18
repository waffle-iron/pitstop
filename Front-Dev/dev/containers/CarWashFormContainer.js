import { connect } from 'react-redux'
import CarWashForm from './../components/carwash/subComponents/CarWashForm.jsx'
import {changeInfo} from './../actions'

const mapDispatchToProps = (dispatch) => {
    return {
        saveInfo: (info) => {
            dispatch(changeInfo(info))
        },

        resetInfoAndError: () => {
            dispatch(changeInfo(''))
        }
    }
}

const CarWashFormContainer = connect(
    null,
    mapDispatchToProps
)(CarWashForm)

export default CarWashFormContainer