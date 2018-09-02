import React, {Component} from "react";
import {connect} from "react-redux";
import {Form, Icon, Input, Button, message} from 'antd';
import {actionAddNode} from "../store/node";

const FormItem = Form.Item;

class NodeForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let node = values.node;
                message.success("add node success!");
                this.props.addNode(node);
                this.props.form.setFieldsValue({node: ''})
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('node', {
                        rules: [{required: true, message: 'Input content can not be empty~~😭'}]
                    })(
                        <Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">submit</Button>
                </FormItem>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => ({addNode: text => dispatch(actionAddNode(text))});

export default connect(null, mapDispatchToProps)(Form.create()(NodeForm));
