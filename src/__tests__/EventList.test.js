import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';

// Custom Components
import Event from '../Event';
import EventList from '../EventList';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});