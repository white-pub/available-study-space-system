export interface DropdownDataType {
    id: number;
    title: string;
    status: boolean;
    text: string;
    image: string;
    extraText: string;
  }
  
  export const dropdownData: DropdownDataType[] = [
    {
      id: 1,
      title: 'Dunklau 045',
      status: true,
      text: '7:00am-10:00pm',
      image: 'dunk_045_car.png',
      extraText: 'This room is usually empty and it is popular for CS students to do stuff in',
    },
    {
      id: 2,
      title: 'Dunklau 049',
      status: true,
      text: '7:00am-9:30pm',
      image: 'dunk_lecture_hall.jpg',
      extraText: 'Lorem ipsum yadayada placeholder text ---------HELLO WORLD---------- Dunk049',
    },
    {
        id: 3,
        title: 'Dunklau 055',
        status: true,
        text: '7:00am-10:00pm',
        image: 'thom_image_placeholder.jpeg',
        extraText: 'This room is usually empty and it is popular for CS students to do stuff in',
      },
      {
        id: 4,
        title: 'Thom 102',
        status: false,
        text: '7:00am-10:00pm',
        image: 'thom_image_placeholder.jpeg',
        extraText: 'Located on the first floor of Thom, next to the stairwell. 30 student capacity, etc. etc. yap yap yap.',
      },
      {
        id: 5,
        title: 'Thom 112',
        status: true,
        text: '7:00am-10:00pm',
        image: 'thom_image_placeholder.jpeg',
        extraText: 'Cool view of the stadium, usually open.',
      },
  ];
  