import moment from 'moment';

const Documents = ({ documents }) => {
  return (
    <div className="flex flex-col  gap-2   bg-white shadow-lg rounded-lg p-4 mt-4'">
      <h3>Documents</h3>
      <div className='flex overflow-x-auto'>
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
    </div>
  );
};

export default Documents;
