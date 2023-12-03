'use client';
import { Flex, Spin } from 'antd';

const Loader = () => {
  return (
    <Flex align='center' gap='middle'>
      <Spin size='large' />
    </Flex>
  );
};

export default Loader;
