import React from 'react';
import { FaTicketAlt, FaCalendarAlt, FaClock, FaChair, FaMapMarkerAlt, FaPrint, FaShare, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeTicket } from '../Redux/ticketsSlice'; // Make sure this path is correct

const Ticket = () => {
  const tickets = useSelector((state) => state.tickets?.items || []);
  const dispatch = useDispatch();

  const handlePrint = (ticketId) => {
    console.log(`Printing ticket ${ticketId}`);
    alert(`Printing ticket ${ticketId}`);
  };

  const generateQRValue = (ticket) => {
    return JSON.stringify({
      id: ticket.id,
      movie: ticket.movie,
      seats: ticket.seats,
      time: `${ticket.date} ${ticket.time}`,
      theater: ticket.theater,
      valid: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleShare = (ticketId) => {
    console.log(`Sharing ticket ${ticketId}`);
    alert(`Sharing ticket ${ticketId}`);
  };

  const handleCancel = (ticketId) => {
    dispatch(removeTicket(ticketId));
    toast.success('Ticket successfully canceled!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const downloadQRCode = (ticketId) => {
    const svg = document.getElementById(`qr-${ticketId}`);
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `ticket-${ticketId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
            <FaTicketAlt className="mr-2 text-green-500" />
            My Tickets
          </h1>
          <p className="mt-2 text-lg text-gray-600">View and manage your booked tickets</p>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <FaTicketAlt className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tickets booked yet</h3>
            <p className="mt-1 text-sm text-gray-500">Book your first movie ticket to get started!</p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Browse Movies
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white shadow overflow-hidden rounded-lg">
                {/* Ticket Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{ticket.movie}</h3>
                    <p className="mt-1 text-sm text-gray-500">Ticket ID: {ticket.id}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handlePrint(ticket.id)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Print Ticket"
                    >
                      <FaPrint className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleShare(ticket.id)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Share Ticket"
                    >
                      <FaShare className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleCancel(ticket.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Cancel Ticket"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Movie Info */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaCalendarAlt className="mt-1 mr-3 text-green-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Date</h4>
                        <p className="text-sm text-gray-900">{ticket.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaClock className="mt-1 mr-3 text-green-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Time</h4>
                        <p className="text-sm text-gray-900">{ticket.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaChair className="mt-1 mr-3 text-green-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Seats</h4>
                        <p className="text-sm text-gray-900">{ticket.seats.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Theater Info */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mt-1 mr-3 text-green-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Theater</h4>
                        <p className="text-sm text-gray-900">{ticket.theater}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 w-4 text-center text-green-500">#</div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Screen</h4>
                        <p className="text-sm text-gray-900">{ticket.screen}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 w-4 text-center text-green-500">$</div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Total Price</h4>
                        <p className="text-sm text-gray-900">${ticket.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - QR Code */}
                  <div className="flex flex-col items-center justify-center border-l border-gray-200 md:pl-6">
                    <div className="mb-4 p-2 bg-white rounded border border-gray-300">
                      <QRCodeSVG
                        id={`qr-${ticket.id}`}
                        value={generateQRValue(ticket)}
                        size={128}
                        level="H"
                        includeMargin={true}
                        fgColor="#000000"
                        bgColor="#ffffff"
                      />
                    </div>
                    <button
                      onClick={() => downloadQRCode(ticket.id)}
                      className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Download QR Code
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">Scan this code at the theater</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;