import React from 'react';
import {post} from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            id: '',
            userName: '',
            birth: '',
            gender: '',
            job: '',
            filename: ''
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
        this.setState({
            file: null,
            id: '',
            userName: '',
            birth: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('img', this.state.file)
        formData.append('id', this.state.id)
        formData.append('name', this.state.userName)
        formData.append('birth', this.state.birth)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        const config = {
            headers: { 
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData , config);
    }

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h2>고객 추가</h2>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                아이디: <input type="text" name="id" value={this.state.id} onChange={this.handleValueChange}/><br/>
                사용자명: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }

}
export default CustomerAdd;