import { connect } from 'react-redux'
import Header from './../components/Header.jsx'
import {changeInfo} from './../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        userName: state.userName
    }
}

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

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer
