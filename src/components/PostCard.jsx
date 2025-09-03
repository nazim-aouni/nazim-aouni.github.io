import { FiCalendar } from "react-icons/fi";

function PostCard({ image, title, date, description, tags = [], href, onClick }) {
  return (
    <section
      id="post_card"
      onClick={onClick}
      className="h-50 group w-full flex flex-col md:flex-row bg-gradient-to-r from-slate-100 via-white to-slate-100 rounded-2xl shadow-sm overflow-hidden
                 transition-transform duration-300 hover:-translate-y-1 border hover:shadow-lg cursor-pointer"
    >
      {/* If href is passed, wrap content in <a> */}
      {href ? (
        <a href={href} className="flex flex-col md:flex-row w-full h-full">
          {/* Image */}
          <div className="md:w-1/3 w-full overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={title}
              className="w-full h-56 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between md:w-2/3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FiCalendar className="w-4 h-4 mx-auto md:mx-1" />
                <span>{date}</span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium
                               bg-blue-50 text-blue-700 border border-blue-200 ring-1 ring-inset ring-blue-100
                               transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </a>
      ) : (
        <>
          {/* Image */}
          <div className="md:w-1/3 w-full overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={title}
              className="w-full h-56 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between md:w-2/3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FiCalendar className="w-4 h-4 mr-1" />
                <span>{date}</span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium
                               bg-blue-50 text-blue-700 border border-blue-200 ring-1 ring-inset ring-blue-100
                               transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default PostCard;
