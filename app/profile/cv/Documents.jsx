import moment from 'moment';

const Documents = ({ documents }) => {
  return (
    <div className="flex flex-col  gap-2   bg-white shadow-lg rounded-lg p-4 mt-4'">
      <h3>Documents</h3>
      {/*Large screens*/}
      <div className=' overflow-x-auto hidden lg:flex'>
        <table className='table table-xs sm:table-sm  mt-2'>
          <thead className='bg-sky-100 border'>
            <tr>
              <th className='text-center '>Document</th>
              <th className='text-center'>Country</th>
              <th className='text-center'>Number</th>
              <th className='text-center'>Issue Date</th>
              <th className='text-center'>Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {documents.seamansBook.number && (
              <tr>
                <td className='text-center border'>
                  <p className='font-semibold'>{`Seaman's Book`}</p>
                </td>
                <td className='border text-center'>
                  <p>{documents.seamansBook.country}</p>
                </td>
                <td className='border text-center'>
                  <p>{documents.seamansBook.number}</p>
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.seamansBook.issueDate).format(
                      'DD.MM.YYYY'
                    )}
                  </p>
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.seamansBook.expiryDate).format(
                      'DD.MM.YYYY'
                    )}
                  </p>
                </td>
              </tr>
            )}
            {documents.travelPassport.number && (
              <tr>
                <td className='text-center border'>
                  <p className='font-semibold'>{`Travel Passport`}</p>
                </td>
                <td className='border text-center'>
                  <p>{documents.travelPassport.country}</p>
                </td>
                <td className='border text-center'>
                  <p>{documents.travelPassport.number}</p>
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.travelPassport.issueDate).format(
                      'DD.MM.YYYY'
                    )}
                  </p>
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.travelPassport.expiryDate).format(
                      'DD.MM.YYYY'
                    )}
                  </p>
                </td>
              </tr>
            )}
            {documents.yellowFever.issueDate && (
              <tr>
                <td className='text-center border'>
                  <p className='font-semibold'>{`Yellow Fever`}</p>
                </td>
                <td className='border text-center'>
                  <p>{documents.yellowFever.place}</p>
                </td>
                <td className='border text-center'>---</td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.yellowFever.issueDate).format(
                      'DD.MM.YYYY'
                    )}
                  </p>
                </td>
                <td className='border text-center'>---</td>
              </tr>
            )}
            {documents.c1d.number && (
              <tr>
                <td className='text-center border'>
                  <p className='font-semibold'>{`US Visa C1/D`}</p>
                </td>
                <td className='border text-center'>
                  <p>---</p>
                </td>
                <td className='border text-center'>{documents.c1d.number}</td>
                <td className='border text-center'>
                  <p>{moment(documents.c1d.issueDate).format('DD.MM.YYYY')}</p>
                </td>
                <td className='border text-center'>
                  <p>{moment(documents.c1d.expiryDate).format('DD.MM.YYYY')}</p>
                </td>
              </tr>
            )}
            {documents.b1ocs.number && (
              <tr>
                <td className='text-center border'>
                  <p className='font-semibold'>{`US Visa B1/OCS`}</p>
                </td>
                <td className='border text-center'>
                  <p>---</p>
                </td>
                <td className='border text-center'>{documents.b1ocs.number}</td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.b1ocs.issueDate).format('DD.MM.YYYY')}
                  </p>
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.b1ocs.expiryDate).format('DD.MM.YYYY')}
                  </p>
                </td>
              </tr>
            )}
            {documents.schengen.number && (
              <tr>
                <td className='text-center border'>
                  <p className='font-semibold'>{`Schengen Visa`}</p>
                </td>
                <td className='border text-center'>
                  <p>---</p>
                </td>
                <td className='border text-center'>
                  {documents.schengen.number}
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.schengen.issueDate).format('DD.MM.YYYY')}
                  </p>
                </td>
                <td className='border text-center'>
                  <p>
                    {moment(documents.schengen.expiryDate).format('DD.MM.YYYY')}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*Small screens*/}
      <div className='flex flex-col lg:hidden'>
        <>
          {documents.seamansBook.number && (
            <div className='mt-4'>
              <hr className='mb-2' />
              <h5>{`Seaman's Book`}</h5>
              <div className='flex flex-col sm:flex-row gap-2 mt-2 '>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Number:</p>
                    <p>{documents.seamansBook.number}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Issue country:</p>
                    <p>{documents.seamansBook.country}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue date:</p>
                    <p>
                      {moment(documents.seamansBook.issueDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Expiry date:</p>
                    <p>
                      {moment(documents.seamansBook.expiryDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        <>
          {documents.travelPassport.number && (
            <div className='mt-4'>
              <hr className='mb-2' />
              <h5>Travel Passport</h5>
              <div className='flex flex-col sm:flex-row  gap-2 mt-2'>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Number:</p>
                    <p>{documents.travelPassport.number}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Issue country:</p>
                    <p>{documents.travelPassport.country}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue date:</p>
                    <p>
                      {moment(documents.travelPassport.issueDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Expiry date:</p>
                    <p>
                      {moment(documents.travelPassport.expiryDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        <>
          {documents.yellowFever.issueDate && (
            <div className='mt-4'>
              <hr className='mb-2' />
              <h5>Yellow Fever</h5>
              <div className='flex flex-col sm:flex-row  gap-2 mt-2'>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue country:</p>
                    <p>{documents.yellowFever.place}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue date:</p>
                    <p>
                      {moment(documents.yellowFever.issueDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        <>
          {documents.c1d.number && (
            <div className='mt-4'>
              <hr className='mb-2' />
              <h5>US Visa C1/D</h5>
              <div className='flex flex-col sm:flex-row  gap-2 mt-2'>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Number:</p>
                    <p>{documents.c1d.number}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue date:</p>
                    <p>
                      {moment(documents.c1d.issueDate).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Expiry date:</p>
                    <p>
                      {moment(documents.c1d.expiryDate).format('DD.MM.YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        <>
          {documents.b1ocs.number && (
            <div className='mt-4'>
              <hr className='mb-2' />
              <h5>US Visa B1/OCS</h5>
              <div className='flex flex-col sm:flex-row  gap-2 mt-2'>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Number:</p>
                    <p>{documents.b1ocs.number}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue date:</p>
                    <p>
                      {moment(documents.b1ocs.issueDate).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Expiry date:</p>
                    <p>
                      {moment(documents.b1ocs.expiryDate).format('DD.MM.YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        <>
          {documents.schengen.number && (
            <div className='mt-4'>
              <hr className='mb-2' />
              <h5>Schengen Visa</h5>
              <div className='flex flex-col sm:flex-row  gap-2 mt-2'>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Number:</p>
                    <p>{documents.schengen.number}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 sm:w-1/2'>
                  <div className='flex'>
                    <p className='w-32'>Issue date:</p>
                    <p>
                      {moment(documents.schengen.issueDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Expiry date:</p>
                    <p>
                      {moment(documents.schengen.expiryDate).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Documents;
