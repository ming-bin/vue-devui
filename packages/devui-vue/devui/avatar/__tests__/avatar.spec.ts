import { mount } from '@vue/test-utils';
import Avatar from '../src/avatar';

describe('avatar', () => {
  describe('name text shown correctly', () => {
    it('chinese name pick last two character', async () => {
      const wrapper = mount(Avatar, {
        props: {
          name: '组件头像',
        },
      });
      expect(wrapper.find('.devui-avatar-style').text()).toBe('头像');
    });
    it('should only show one character when width less than 30', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: '组件头像',
          width: 25,
        },
      });
      expect(wrapper.find('.devui-avatar-style').text()).toBe('组');
    });
    it('one word name pick first two character', () => {
      const name = 'MyAvatar';
      const wrapper = mount(Avatar, {
        props: {
          name,
        },
      });
      expect(wrapper.find('.devui-avatar-style').text()).toBe('MY');
    });
    it('display origin name when name length less than 2', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: 'A',
        },
      });
      expect(wrapper.find('.devui-avatar-style').text()).toBe('A');
    });
    it('should empty name display none text', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: '',
        },
      });
      expect(wrapper.find('svg').exists()).toBe(true);
    });
    it('two words name pick first character of two words', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: 'Avatar1 Avatar2',
        },
      });
      expect(wrapper.find('.devui-avatar-style').text()).toBe('AA');
    });
  });

  describe('background should be ok', () => {
    it('should be male background', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: 'avatar',
          gender: 'male',
        },
      });
      expect(wrapper.find('.devui-avatar-background-1').exists()).toBe(true);
    });
    it('should be female background', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: 'avatar',
          gender: 'female',
        },
      });
      expect(wrapper.find('.devui-avatar-background-0').exists()).toBe(true);
    });
    it('gender error should throw error', () => {
      expect(() => {
        mount(Avatar, {
          props: {
            name: 'avatar',
            gender: 'unknown',
          },
        });
      }).toThrowError('gender must be "Male" or "Female"');
    });
  });

  describe('custom avatar', () => {
    it('should custom text display correct', () => {
      const wrapper = mount(Avatar, {
        props: {
          customText: '自定义',
          width: 80,
          height: 80,
        },
      });
      expect(wrapper.find('.devui-avatar-style').text()).toBe('自定义');
      expect(
        wrapper
          .find('.devui-avatar-style')
          .attributes('style')
          .includes('height: 80px')
      ).toBe(true);
      expect(
        wrapper
          .find('.devui-avatar-style')
          .attributes('style')
          .includes('width: 80px')
      ).toBe(true);
    });
  });
});
