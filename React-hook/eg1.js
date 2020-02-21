// 原始的class写react
class AddCount extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    addcount = () => {
        let newCount = this.state.count
        this.setState({
            count: newCount += 1
        })
    }
    render () {
        return (
            <>
                <p>{this.state.count}</p>
                <button onClick={this.addcount}>count++</button>
            </>
        )
    }
}

export default AddCount