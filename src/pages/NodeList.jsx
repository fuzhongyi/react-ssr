import React, {Component} from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import {List, Popconfirm, Button} from 'antd';
import {actionDelNode} from '../store/node';
import xyue from '@/assets/xyue.png';

const StyledList = styled(List)`
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    .ant-list-item {
        padding-left: 16px;
        padding-right: 16px;
    }
`;

class NodeList extends Component {
    render = () =>
        <React.Fragment>
            <img src={xyue} alt="xyue"/>
            <StyledList
                dataSource={this.props.data}
                renderItem={(item, idx) => (
                    <List.Item>{item}
                        <Popconfirm
                            title="Are you sure to delete?"
                            placement="topLeft"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={this.props.delNode.bind(this, idx)}>
                            <Button size="small">delete</Button>
                        </Popconfirm>
                    </List.Item>)}>
            </StyledList>
        </React.Fragment>
}

const mapStateToProps = state => ({data: state.node});
const mapDispatchToProps = dispatch => ({delNode: idx => dispatch(actionDelNode(idx))});

export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
