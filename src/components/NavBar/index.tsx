import { QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button, Switch, Tabs } from "antd";

const NavBar = () => (
  <div className='header flex flex-col sm:flex-row items-center'>
    <div className='font-sans text-2xl font-bold pb-2 text-gray-500 flex justify-start items-center mr-20'>
      Depo<span className='text-blue-700'>IQ</span>
    </div>
    <div className='flex flex-row justify-between items-center flex-1 w-full sm:w-fit'>
      <Tabs
        items={[
          { label: 'Cases', key: 'case' },
          { label: 'Deponents', key: 'deponent' },
        ]}
      />
      <div className='flex flex-row items-center gap-3'>
        <Button icon={<QuestionCircleOutlined />} danger type='primary'>Ask AMI</Button>
        <Button icon={<SettingOutlined />} type='text'></Button>
        <OrganizationSwitcher />
        <Switch checkedChildren='Dark' unCheckedChildren='Light' />
      </div>
    </div>
  </div>
);
export default NavBar;
