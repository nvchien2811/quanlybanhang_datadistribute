import React ,{useEffect,useState} from 'react';
import { Select,Table } from 'antd';
import {getPrice} from '../../util/getPrice';
import { Drawer, Button, Form, Input ,InputNumber,message, notification} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import * as FetchAPI from '../../util/fetchAPI';
import moment from 'moment'
const { Option } = Select;

function Bill(props){
    const [formadd] = Form.useForm();
    const [visibleAddBill, setvisibleAddBill] = useState(false);
    const [dataSourceBill, setdataSourceBill] = useState([]);
    // const [MCN, setMCN] = useState("full")
    const [loadingTable, setloadingTable] = useState(false)
    const [SelectCode, setSelectCode] = useState([]);
    const [showmodalContent, setshowmodalContent] = useState(false);
    
    // const handleChangeSelect = (e)=>{
    //     setMCN(e);
    //     console.log(props.MCN)
    // }
    const onFinishAddBill = async()=>{
        let obj = {MCN:props.MCN,...formadd.getFieldValue()}
        console.log(obj)
        const res = await FetchAPI.postDataAPI("/bill/addBill",obj);
        if(res.msg){
            if(res.msg==="Success"){
                message.success("Thêm hóa đơn thành công !!!");
                formadd.setFieldsValue({MAKH:null,MANV:null,SOHD:null,MAKHO:null, TRIGIA:null});
                setvisibleAddBill(false);
            }else{
                message.error("Có lỗi rồi");
                 setvisibleAddBill(false);
            }
        }
    }
    useEffect(()=>{
        setloadingTable(true);
        formadd.setFieldsValue({MAKH:null,MANV:null,SOHD:null,MAKHO:null, TRIGIA:null});
        getBill();
        getCode();

    },[props.MCN])

    const getBill = async()=>{
        const res = await FetchAPI.postDataAPI("/bill/getBill",{"MCN":props.MCN});
        console.log(res)
        setdataSourceBill(res.msg.recordsets[0]);
        setloadingTable(false);
    }

    const getCode = async()=>{
        const res = await FetchAPI.postDataAPI("/bill/getCode",{"MCN":props.MCN});
        console.log(res.msg.recordsets)
        setSelectCode(res.msg.recordsets)
        setshowmodalContent(true);
        
    }
      
      const columnsBill = [
        {
          title: 'Mã hóa đơn',
          dataIndex: 'SOHD',
          key: 'SOHD',
          render: (text,record) =>(
              <div>
                  <span>{text}</span>
              </div>
          )
        },
        {
          title: 'Ngày tạo',
          dataIndex: 'NGHD',
          key: 'NGHD',
          render: (text,record)=>(
              <span>{moment(text).format('Do MMMM YYYY, H:mm:ss')}</span>
          )
        },
        {
          title: 'Tên khách hàng',
          dataIndex: 'HOTEN_KH',
          key: 'HOTEN_KH',
        },
        {
            title: 'Họ tên nhân viên',
            dataIndex: 'HOTEN_NV',
            key: 'HOTEN_NV',
        },
        {
            title: 'Mã kho hàng',
            dataIndex: 'MAKHO',
            key: 'MAKHO',
        },
        {
            title: 'Giá trị',
            dataIndex: 'TRIGIA',
            key: 'TRIGIA',
            render: (text,record)=>(
                <span>{`${getPrice(text)} đ`}</span>
            )
        },
    ];
    const SelectCodeAddbill = (SelectCode)=>{
        return(
        <Select placeholder='Chọn nhân viên'>
            {SelectCode[0].map((item)=>(
                <Option key={item.MNV} value={item.MNV}>{item.HOTEN} ( {item.MNV} )</Option>
            ))}            
        </Select>
        )
    }
    const SelectCodeCustommer = (SelectCode)=>{
        return(
            <Select placeholder='Chọn khách hàng'>
                {SelectCode[1].map((item)=>(
                    <Option key={item.MKH} value={item.MKH}>{item.HOTENKG} ( {item.MKH} )</Option>
                ))}            
            </Select>
            )
    }

    const SelectCodeKho = (SelectCode)=>{
        return(
            <Select placeholder='Chọn kho hàng'>
                {SelectCode[2].map((item)=>(
                    <Option key={item.MAKHO} value={item.MAKHO}>{item.DIACHI} ( {item.MAKHO} )</Option>
                ))}            
            </Select>
            )
    }

    return(
        <div className="wrapperBill">
            <div className="top">
                {props.MCN === 'full'?
                <Button ghost type="primary" danger
                 onClick={()=>notification["warning"]({
                    message: 'Thông báo',
                    description:
                    'Vui lòng chọn chi nhánh khi thêm hóa đơn.',
                    })
                }>
                    <PlusCircleOutlined />
                        Thêm hóa đơn
                </Button>:
                <Button type="primary" danger onClick={()=>setvisibleAddBill(true)}>
                    <PlusCircleOutlined />
                    Thêm hóa đơn
                </Button>
                }

            </div>
            {/* <h2> Chọn chi nhánh </h2>
            <Select defaultValue="full" onChange={handleChangeSelect}>
                <Option value="full">Tất cả chi nhánh</Option>
                <Option value="CN1">Chi nhánh 1</Option>
                <Option value="CN2">Chi nhánh 2</Option>
                <Option value="CN3">Chi nhánh 3</Option>
            </Select> */}
            <Table 
                dataSource={dataSourceBill} 
                columns={columnsBill}
                className="tableBill"
                loading={loadingTable}
            />
            {showmodalContent &&
            <Drawer 
                title="Thêm hóa đơn"
                placement="right" 
                onClose={()=>setvisibleAddBill(false)} 
                visible={visibleAddBill}
                width={500}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinishAddBill}
                    autoComplete="off"
                    form={formadd}
                >
                    <Form.Item
                        label="Nhân viên"
                        name="MANV"
                        rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
                    >
                            {SelectCodeAddbill(SelectCode)}
                    </Form.Item>

                    <Form.Item
                        label="Mã khách hàng"
                        name="MAKH"
                        rules={[{ required: true, message: 'Vui lòng chọn mã khách hàng' }]}
                    >
                        {SelectCodeCustommer(SelectCode)}
                    </Form.Item>
                    <Form.Item
                        label="Mã kho hàng"
                        name="MAKHO"
                        rules={[{ required: true, message: 'Vui chọn chi nhánh' }]}
                    >
                      {SelectCodeKho(SelectCode)}
                    </Form.Item>
                    <Form.Item
                        label="Mã hóa đơn"
                        name="SOHD"
                        rules={[{ required: true, message: 'Vui lòng nhập mã hóa đơn!' }]}
                    >
                        <Input
                            placeholder="Nhập mã hóa đơn"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Đơn giá"
                        name="TRIGIA"
                        rules={[{ required: true, message: 'Vui lòng nhập đơn giá!' }]}
                    >
                        <InputNumber
                            placeholder="Đơn giá"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            min={0}
                            style={{ width:"100%" }}
                        />
                    </Form.Item>
                    <Form.Item 
                        wrapperCol={{ offset: 8, span: 16 }}
                        style={{display:'flex' }}
                    >
                        <Button danger type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            }
        </div>
    )
}

export default Bill;