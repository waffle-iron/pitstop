import { connect } from 'react-redux'
import Message from './../components/message'


const mapStateToProps = (state, ownProps) => {
    return {
        info: state.info,
        error : state.error
    }
}

const MessageContainer = connect(
    mapStateToProps
)(Message)

export default MessageContainer