import Vue from 'vue'
import {Button, Container, Header, Main, Input, Form, FormItem, Message, Upload, Avatar, Carousel, CarouselItem, Menu, MenuItem, Image, Row, Col, Aside, Rate, Pagination, Dropdown, DropdownMenu, DropdownItem, MessageBox} from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(Avatar);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Image);
Vue.use(Row);
Vue.use(Col);
Vue.use(Aside);
Vue.use(Rate);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;