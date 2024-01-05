import moment from 'moment';

const Experience = ({ seaService }) => {
  const contractLength = (signOn, signOff) => {
    const embarkation = moment(signOn);
    const disembarkation = moment(signOff);
    const daysOnBoard = disembarkation.diff(embarkation, 'days');
    const monthsOnBoard = disembarkation.diff(embarkation, 'months');
    const days = disembarkation.diff(embarkation, 'days') % 30;
    if (monthsOnBoard > 0) {
      return (
        <div className='flex gap-1  whitespace-nowrap '>
          <p className=''>
            {monthsOnBoard} {monthsOnBoard === 1 ? 'month,' : 'months,'}
          </p>
          <p className=''>
            {days} {daysOnBoard === 1 ? 'day' : 'days'}
          </p>
          <p>({daysOnBoard} days)</p>
        </div>
      );
    } else if (daysOnBoard > 0) {
      return (
        <div className='flex items-center whitespace-nowrap '>
          <p className=''>{daysOnBoard} days</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col  gap-2   bg-white shadow-lg rounded-lg p-4 mt-4'">
      <h3>Sea Service (last 5 years)</h3>
      {seaService.map((record) => {
        return (
          <div key={record.recordId} className='mt-5'>
            <div className='flex flex-col lg:flex-row'>
              <h4 className='w-1/2'>{record.position}</h4>
              <div className='flex items-end sm:gap-2 flex-wrap justify-between'>
                <h5>
                  {moment(record.signOnDate).format('DD.MM.YYYY')} -{' '}
                  {moment(record.signOffDate).format('DD.MM.YYYY')}
                </h5>
                {contractLength(record.signOnDate, record.signOffDate)}
              </div>
            </div>
            <hr className='my-2' />
          </div>
        );
      })}
    </div>
  );
};

export default Experience;
