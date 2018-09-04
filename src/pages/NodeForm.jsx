import React, {Component} from "react";
import {connect} from "react-redux";
import {Form, Icon, Input, Button, Tooltip} from 'antd';
import {actionAddNode} from "@/store/node";

const FormItem = Form.Item;

class NodeForm extends Component {

    state = {
        visible: false
    }

    handleChange = (e) => {
        let value = e.target.value;
        this.props.form.setFieldsValue({node: value});
        this.setState({
            visible: value.length > 10
        })
    }

    initValue = () => {
        this.refs.node.input.value = '';
        this.props.form.setFieldsValue({node: ''});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addNode({data: values.node});
                this.state.visible ? this.setState({visible: false}, this.initValue) : this.initValue();
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('node', {
                        rules: [{required: true, message: 'Input content can not be empty~~😭'}]
                    })(
                        <Tooltip trigger={['focus']}
                                 title={getFieldValue('node')}
                                 placement="bottomLeft"
                                 visible={this.state.visible}>
                            <Input
                                ref='node'
                                onChange={this.handleChange}
                                prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                        </Tooltip>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={this.props.node.loading}>submit</Button>
                </FormItem>
            </Form>
        )
    }
}

const mapStateToProps = state => ({node: state.node});
const mapDispatchToProps = dispatch => ({addNode: text => dispatch(actionAddNode(text))});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NodeForm));
