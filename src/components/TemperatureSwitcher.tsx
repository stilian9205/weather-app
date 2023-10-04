import React, { FC } from 'react';
import _ from 'lodash';
import { temperatureUnits } from '../constants/constants';
import { TemperatureSwitcherInterface } from '../interfaces/interfaces';

const TemperatureSwitcher: FC<TemperatureSwitcherInterface> = ({ onChangeMetrics, unitOfMeasure }) => {

    return (
        <div className="temperature-switcher">
            {_.map(temperatureUnits, (unit, key) => {
                return <React.Fragment key={key}>
                    <div className={`temperature-units ${unitOfMeasure === unit.requestParam && "inactive-temperature-units"}`} onClick={() => onChangeMetrics(unit.requestParam)}>
                        {`${unit.name} ${unit.sign}`}
                    </div>
                    {key !== (temperatureUnits.length - 1) && <span className="temperature-units-divider">|</span>}
                </React.Fragment>;
            })}
        </div>
    );
};

export default TemperatureSwitcher;