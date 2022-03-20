import React ,{useState} from 'react';
import { Select,Table } from 'antd';
import {getPrice} from '../../util/getPrice';
import { Drawer, Button, Form, Input ,InputNumber} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'

const { Option } = Select;

function Bill(){
    const [formadd] = Form.useForm();
    const [visibleAddBill, setvisibleAddBill] = useState(false);
    const handleChangeSelect = (e)=>{

    }
    const onFinishAddBill = ()=>{
        console.log(formadd.getFieldValue())
    }
    const dataSourceBill = [
        {
            SOHD: '1001',
            NGHD: '2022-06-05 00:00:00',
            MAKH: 'KH01',
            MANV: 'NV01',
            MAKHO: 'K1',
            TRIGIA: 300000
        },
        {
            SOHD: '1002',
            NGHD: '2022-06-05 00:00:00',
            MAKH: 'KH01',
            MANV: 'NV02',
            MAKHO: 'K1',
            TRIGIA: 300000
        },
        {
            SOHD: '1012',
            NGHD: '2022-06-05 00:00:00',
            MAKH: 'KH02',
            MANV: 'NV05',
            MAKHO: 'K2',
            TRIGIA: 350000
        },
        {
            SOHD: '1013',
            NGHD: '2022-06-05 00:00:00',
            MAKH: 'KH03',
            MANV: 'NV06',
            MAKHO: 'K2',
            TRIGIA: 400000
        },
      ];
      
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
        },
        {
          title: 'Mã khách hàng',
          dataIndex: 'MAKH',
          key: 'MAKH',
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'MANV',
            key: 'MANV',
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
    
    return(
        <div className="wrapperBill">
            <div className="top">
                <Button type="primary" danger onClick={()=>setvisibleAddBill(true)}>
                    <PlusCircleOutlined />
                    Thêm hóa đơn
                </Button>
            </div>
            <h2> Chọn chi nhánh </h2>
            <Select defaultValue="full" onChange={handleChangeSelect}>
                <Option value="full">Tất cả chi nhánh</Option>
                <Option value="1">Chi nhánh 1</Option>
                <Option value="2">Chi nhánh 2</Option>
                <Option value="3">Chi nhánh 3</Option>
            </Select>
            <Table 
                dataSource={dataSourceBill} 
                columns={columnsBill}
                className="tableBill"
            />
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
                    initialValues={{ CHINHANH: "full" }}
                    onFinish={onFinishAddBill}
                    autoComplete="off"
                    form={formadd}
                >
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
                        label="Mã khách hàng"
                        name="MAKH"
                        rules={[{ required: true, message: 'Vui lòng nhập mã khách hàng!' }]}
                    >
                        <Input 
                            placeholder="Nhập mã khách hàng"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mã nhân viên"
                        name="MANV"
                        rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên!' }]}
                    >
                        <Input 
                            placeholder="Nhập mã nhân viên"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mã kho hàng"
                        name="MAKHO"
                        rules={[{ required: true, message: 'Vui lòng nhập mã kho!' }]}
                    >
                        <Input 
                            placeholder="Nhập mã kho hàng"
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
                        label="Chọn chi nhánh"
                        name="CHINHANH"
                        rules={[{ required: true, message: 'Vui chọn chi nhánh' }]}
                    >
                        <Select defaultValue="full">
                            <Option value="full">Tất cả chi nhánh</Option>
                            <Option value="1">Chi nhánh 1</Option>
                            <Option value="2">Chi nhánh 2</Option>
                            <Option value="3">Chi nhánh 3</Option>
                        </Select>
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
        </div>
    )
}

export default Bill;