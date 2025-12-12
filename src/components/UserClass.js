import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        // console.log(props);
        this.state={
            count:0,
            count2:1,
            userInfo: {
                name:"Dummy",
                avatar_url:'https://dummy.com'
            }
        }
        // console.log(this.props.name+ "child constructor invoked");
    }
    async componentDidMount(){
        // console.log(this.props.name+ "child componentDidMount invoked");

        //need compwillunmount to unmount this
        // this.timer= setInterval(()=>{
        //     console.log("set interval of UsreClass")
        // },1000)
        const data= await fetch("https://api.github.com/users/alekhyaE");
        const jsonData= await data.json();
        // console.log(jsonData);
        this.setState({
            userInfo:jsonData
        })
    }

    componentWillUnmount(){
        // console.log("component Unmount called");
        clearInterval(this.timer)
    }
    componentDidUpdate(){
        // console.log("component update called")
    }
    render() {
        // console.log(this.props.name+ "child render invoked")
       return( <div className="user-card">
                <h2>Count(class): {this.state.count}</h2>
                <button onClick={()=>{
                   this.setState({
                    count:this.state.count+1
                   }) 
                }}>Count Increase!!!</button>
                <h1>Name: {this.state.userInfo.login} </h1>
                <h3>Location: {this.props.location}</h3>
                <img className="avatar-user" src={this.state.userInfo.avatar_url}></img>
                <h3>Contact: aleke</h3>
        </div>
       );
    }
}

export default UserClass;
