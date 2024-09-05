'use client';
import React from 'react';
import {
  DownloadOutlined,
  FileTextOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Input, Tag } from 'antd';

const SearchBar = () => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <div className='toolbar'>
      <Breadcrumb items={[
        { title: "Cases" },
        { title: "Marvin McKinney v Miles" },
        { title: "Comparison" },
      ]} />
      <div className='flex flex-col md:flex-row justify-between items-center p-4 bg-white'>
        <div className='flex items-center mb-4 md:mb-0'>
          <h3 className='text-lg font-semibold mr-4'>Cross Deposition Analysis</h3>
          <span className='flex items-center'>
            Deponents:&nbsp;
            <Tag color='#CBE4D2' className='text-green-700 text-xs px-1'>
              <UserOutlined />&nbsp;4
            </Tag>
          </span>
          <span className='flex items-center ml-4'>
            Depositions:&nbsp;
            <Tag color='#D9E5F7' className='text-blue-700 text-xs px-1'>
              <FileTextOutlined />&nbsp;4
            </Tag>
          </span>
        </div>
        <div className='flex items-center'>
          <Button type='primary' className='mr-3'>
            <PlusOutlined />
            Add Depo
          </Button>
          <Button type='primary' className='mr-3'>
            <DownloadOutlined />
          </Button>
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='border rounded px-2 py-1'
          />
        </div>
      </div>
    </div>
  )
};

export default SearchBar;