import { shallowMount } from '@vue/test-utils';
import Home from './home.vue';

const wrapper = shallowMount(Home);

describe('Home', () => {
    it('should render correctly', () => {
        expect(wrapper.find('al-input')).toHaveLength(1);
    });
});
