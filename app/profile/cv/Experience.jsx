import moment from 'moment';
import { BsInfoCircle } from 'react-icons/bs';
import { Empty } from 'antd';

const Experience = ({ seaService }) => {
  const contractLength = (signOn, signOff) => {
    const embarkation = moment(signOn);
    const disembarkation = moment(signOff);
    const daysOnBoard = disembarkation.diff(embarkation, 'days');
    const monthsOnBoard = disembarkation.diff(embarkation, 'months');
    const days = disembarkation.diff(embarkation, 'days') % 30;
    if (monthsOnBoard > 0) {
      return `${monthsOnBoard} ${monthsOnBoard === 1 ? 'month,' : 'months,'}
              ${days} ${daysOnBoard === 1 ? 'day' : 'days'}
              (${daysOnBoard} days)`;
    } else if (daysOnBoard > 0) {
      return `${daysOnBoard} days`;
    }
  };

  return (
    <div className="flex flex-col  gap-2   bg-white shadow-lg rounded-lg p-4 mt-4'">
      <h3>Sea Service (last 5 years)</h3>
      {seaService.length !== 0 ? (
        <div>
          {/* Big devices only */}
          <div className='hidden lg:flex'>
            <table className='table table-sm mt-2'>
              <thead className='bg-sky-100 border'>
                <tr>
                  <th className='text-center '>Position</th>
                  <th className='text-center'>Vessel Name / Flag</th>
                  <th className='text-center'>Vessel Type / DWT</th>
                  <th className='text-center'>Year Built</th>
                  <th className='text-center'>ME Type / kW</th>
                  <th className='text-center'>Period</th>
                  <th className='text-center'>Shipowner / Country</th>
                </tr>
              </thead>

              <tbody>
                {seaService.map((record) => {
                  return (
                    <tr key={record.recordId}>
                      <td className='text-sm border'>
                        <p className='flex justify-center font-semibold'>
                          {record.position}
                        </p>
                      </td>
                      <td className='text-sm border '>
                        <div className='flex flex-col items-center gap-1'>
                          <p>{record.vesselName}</p>
                          <p>{record.vesselFlag}</p>
                        </div>
                      </td>
                      <td className='text-sm border'>
                        <div className='flex flex-col items-center gap-1'>
                          <p>{record.vesselType}</p>
                          <p>{record.vesselDWT}</p>
                        </div>
                      </td>
                      <td className='text-sm border'>
                        <div className='flex flex-col items-center gap-1'>
                          <p>{record.vesselYearBuilt}</p>
                        </div>
                      </td>
                      <td className='text-sm border'>
                        <div className='flex flex-col items-center gap-1'>
                          <p>{record.mainEngineType}</p>
                          <p>{record.mainEngineKw}</p>
                        </div>
                      </td>
                      <td className='text-sm border'>
                        <div className='flex flex-col items-center gap-1'>
                          <div className='flex gap-2'>
                            <p>
                              {moment(record.signOnDate).format('DD.MM.YYYY')}
                            </p>
                            <p>-</p>
                          </div>
                          <div className='flex gap-1'>
                            <p className='ml-1.5'>
                              {moment(record.signOffDate).format('DD.MM.YYYY')}{' '}
                            </p>
                            <div
                              className='tooltip'
                              data-tip={`${contractLength(
                                record.signOnDate,
                                record.signOffDate
                              )}`}
                            >
                              <BsInfoCircle />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='text-sm border'>
                        <div className='flex flex-col items-center gap-1'>
                          <p>{record.shipOwner}</p>
                          <p>{record.country}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Small devices only */}
          <div className='lg:hidden'>
            {seaService.map((record) => {
              return (
                <div key={record.recordId} className='mt-3 '>
                  <hr className='mb-4' />
                  <div className='flex flex-col gap-2'>
                    <h4 className='w-1/2'>{record.position}</h4>
                    <div className='flex flex-col md:flex-row gap-2 md:gap-20'>
                      <div className=' flex flex-col gap-2'>
                        <div className='flex  '>
                          <p className='w-32'>Period:</p>
                          <div className='flex gap-2'>
                            {moment(record.signOnDate).format('DD.MM.YYYY')} -{' '}
                            {moment(record.signOffDate).format('DD.MM.YYYY')}
                            <div
                              className='tooltip'
                              data-tip={`${contractLength(
                                record.signOnDate,
                                record.signOffDate
                              )}`}
                            >
                              <BsInfoCircle />
                            </div>
                          </div>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>Vessel type:</p>
                          <p className='font-semibold'>{record.vesselType}</p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>Vessel name:</p>
                          <p className='font-semibold'>{record.vesselName}</p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>Vessel flag:</p>
                          <p className='font-semibold'>{record.vesselFlag}</p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>Year built:</p>
                          <p className='font-semibold'>
                            {record.vesselYearBuilt}
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex'>
                          <p className='w-32'>DWT:</p>
                          <p className='font-semibold'>{record.vesselDWT}</p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>ME power, kW:</p>
                          <p className='font-semibold'>{record.mainEngineKw}</p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>ME type:</p>
                          <p className='font-semibold'>
                            {record.mainEngineType}
                          </p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>Shipowner:</p>
                          <p className='font-semibold'>{record.shipOwner}</p>
                        </div>
                        <div className='flex'>
                          <p className='w-32'>Owner country:</p>
                          <p className='font-semibold'>{record.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='flex w-full justify-center items-center my-5'>
          <Empty
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            description={<span>No service records yet...</span>}
          ></Empty>
        </div>
      )}
    </div>
  );
};

export default Experience;
