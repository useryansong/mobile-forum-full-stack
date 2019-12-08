import React from "react"
import { Button } from "antd-mobile"
class NotFound extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Sorry, not found the page!</h2>

                    <Button
                        type="primary"
                        onClick={() => this.props.history.replace("/")}
                    >
                        Back to main page
                    </Button>
                </div>
            </div>
        )
    }
}
export default NotFound