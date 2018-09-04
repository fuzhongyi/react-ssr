import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {Popconfirm, Button, Table, Spin} from "antd";
import {actionDelNode} from "@/store/node";
import xyue from '@/assets/xyue.png';
import {actionGetNodes} from "@/store/node";

const StyledBg = styled.div`
    height: 200px;
    max-width: 1360px;
    background: url(${xyue}) center no-repeat;
    background-size: cover;
`;

class NodeList extends Component {

    static prefetch(store) {
        return store.dispatch(actionGetNodes());
    }

    state = {
        columns: [{
            dataIndex: 'data',
            key: 'data',
        }, {
            dataIndex: 'id',
            key: 'id',
            width: 50,
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete?"
                    placement="topRight"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={this.props.delNode.bind(this, record.id)}>
                    <Button size="small" type="dashed" shape="circle" icon="delete"/>
                </Popconfirm>)
        }]
    }

    componentDidMount() {
        if (this.props.node.data.length === 0) {
            this.props.getNodes();
        }
    }

    render = () =>
        <React.Fragment>
            <StyledBg/>
            <Spin spinning={this.props.node.loading}>
                <Table rowKey={record => record.id} columns={this.state.columns} showHeader={false} dataSource={this.props.node.data}/>
            </Spin>
        </React.Fragment>
}

const mapStateToProps = state => ({node: state.node});
const mapDispatchToProps = dispatch => ({
    getNodes: () => dispatch(actionGetNodes()),
    delNode: id => dispatch(actionDelNode(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
