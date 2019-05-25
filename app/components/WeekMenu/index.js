import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import moment from 'moment';
import _ from 'lodash';

import healthMenu from '../../files/health_menu.pdf';
import youthMenu from '../../files/youth_menu.pdf';
import beautyMenu from '../../files/beauty_menu.pdf';
import CloseIcon from '../Header/img/close.svg';

const menu = {
  1: healthMenu,
  2: beautyMenu,
  3: youthMenu,
};
const getWeekNumber = w => {
  let week;
  if (w > 3) {
    week = w % 3;
  } else {
    week = w;
  }

  if (_.isInteger(week / 3)) {
    return menu[3];
  }
  if (_.isInteger(week / 2)) {
    return menu[2];
  }
  return menu[1];
};

const getFormat = date => date.format('DD.MM');
const getStartWeekDay = day => getFormat(day.startOf('isoWeek'));
const getEndWeekDay = day => getFormat(day.endOf('isoWeek'));

function WeekMenu(props) {
  const startPoint = moment([2019, 4, 6]);
  const daysDiff = moment().diff(startPoint, 'days');
  const week = Math.floor(daysDiff / 7) + 1;

  const currentWeekFirstDay = getStartWeekDay(moment());
  const currentWeekLastDay = getEndWeekDay(moment());
  const currentWeekMenu = getWeekNumber(week);

  const nextWeekDay = moment().add(1, 'week');
  const nextWeekFirstDay = getStartWeekDay(nextWeekDay);
  const nextWeekLastDay = getEndWeekDay(nextWeekDay);
  const nextWeekMenu = getWeekNumber(week + 1);

  const weekAfterWeekDay = moment().add(2, 'week');
  const weekAfterWeekFirstDay = getStartWeekDay(weekAfterWeekDay);
  const weekAfterWeekLastDay = getEndWeekDay(weekAfterWeekDay);
  const weekAfterWeekWeekMenu = getWeekNumber(week + 2);

  return (
    <Dialog
      open={props.isOpen}
      PaperProps={{
        className: 'popup',
        style: {
          maxWidth: '546px',
          marginLeft: '0',
          marginRight: '0',
          width: '100%',
        },
      }}
    >
      <DialogContent>
        <a
          href="/"
          className="product__description_header_close close"
          onClick={props.closeModal}
        >
          <img src={CloseIcon} alt="close" className="close_img" />
        </a>
        <div className="week__menu_content">
          <a
            target="_blank"
            href={currentWeekMenu}
            className="week__menu_item week__menu_active"
          >
            <div>Меню текущей недели</div>
            <div>{`(${currentWeekFirstDay} - ${currentWeekLastDay})`}</div>
          </a>
          <a target="_blank" href={nextWeekMenu} className="week__menu_item">
            <div>Меню следующей недели</div>
            <div>{`(${nextWeekFirstDay} - ${nextWeekLastDay})`}</div>
          </a>
          <a
            target="_blank"
            href={weekAfterWeekWeekMenu}
            className="week__menu_item"
          >
            <div>Меню следующей недели</div>
            <div>{`(${weekAfterWeekFirstDay} - ${weekAfterWeekLastDay})`}</div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

WeekMenu.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default WeekMenu;
