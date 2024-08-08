function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

// icons.tsx

export const ReactIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_16_20)">
        <path
          d="M8.83551 10.0619C9.62312 10.0619 10.2616 9.42341 10.2616 8.6358C10.2616 7.8482 9.62312 7.20972 8.83551 7.20972C8.0479 7.20972 7.40942 7.8482 7.40942 8.6358C7.40942 9.42341 8.0479 10.0619 8.83551 10.0619Z"
          fill="#A1A1A1"
        />
        <path
          d="M8.83552 11.5573C13.0617 11.5573 16.4877 10.2492 16.4877 8.63561C16.4877 7.02197 13.0617 5.71387 8.83552 5.71387C4.60934 5.71387 1.18335 7.02197 1.18335 8.63561C1.18335 10.2492 4.60934 11.5573 8.83552 11.5573Z"
          stroke="#A1A1A1"
          strokeWidth="0.695652"
        />
        <path
          d="M6.30528 10.0966C8.41837 13.7565 11.2642 16.0695 12.6617 15.2627C14.0591 14.4559 13.479 10.8348 11.3659 7.17483C9.25279 3.51485 6.40694 1.20191 5.0095 2.00872C3.61205 2.81554 4.19219 6.43659 6.30528 10.0966Z"
          stroke="#A1A1A1"
          strokeWidth="0.695652"
        />
        <path
          d="M6.30521 7.17472C4.19212 10.8347 3.61198 14.4557 5.00942 15.2626C6.40687 16.0694 9.25272 13.7564 11.3658 10.0965C13.4789 6.43648 14.059 2.81543 12.6616 2.00861C11.2641 1.2018 8.4183 3.51474 6.30521 7.17472Z"
          stroke="#A1A1A1"
          strokeWidth="0.695652"
        />
      </g>
      <defs>
        <clipPath id="clip0_16_20">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.835449 0.635742)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const JavascriptIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
    >
      <path d="M32 32v448h448V32zm240 348c0 43.61-25.76 64.87-63.05 64.87-33.68 0-53.23-17.44-63.15-38.49l34.28-20.75c6.61 11.73 11.63 21.65 26.06 21.65 12 0 21.86-5.41 21.86-26.46V240h44zm99.35 63.87c-39.09 0-64.35-17.64-76.68-42L329 382c9 14.74 20.75 24.56 41.5 24.56 17.44 0 27.57-7.72 27.57-19.75 0-14.43-10.43-19.54-29.68-28l-10.52-4.52c-30.38-12.92-50.52-29.16-50.52-63.45 0-31.57 24.05-54.63 61.64-54.63 26.77 0 46 8.32 59.85 32.68L396 290c-7.22-12.93-15-18-27.06-18-12.33 0-20.15 7.82-20.15 18 0 12.63 7.82 17.74 25.86 25.56l10.52 4.51c35.79 15.34 55.94 31 55.94 66.16.01 37.9-29.76 57.64-69.76 57.64z"></path>
    </svg>
  );
};

export const TypescriptIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
    >
      <rect width="17" height="17" fill="#3178c6" rx="50"></rect>
      <rect width="512" height="17" fill="#3178c6" rx="50"></rect>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386S368.637 470 380.949 470c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65S470 415.559 470 403.044c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894a97.514 97.514 0 0113.694 4.928c4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492S415.797 238 404.112 238c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zM232.78 284.082H297V243H118v41.082h63.906V467h50.874z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const CssIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="currentColor"
      className={className}
      width={17}
      height={17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"></path>
    </svg>
  );
};

export const JsonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="#000"
      version="1.1"
      viewBox="0 0 58 58"
      xmlSpace="preserve"
    >
      <path d="M33.655 45.988c-.232-.31-.497-.533-.793-.67s-.608-.205-.937-.205c-.337 0-.658.063-.964.191s-.579.344-.82.649-.431.699-.567 1.183c-.137.483-.21 1.075-.219 1.777.009.684.08 1.267.212 1.75s.314.877.547 1.183.497.528.793.67.608.212.937.212c.337 0 .658-.066.964-.198s.579-.349.82-.649.431-.695.567-1.183.21-1.082.219-1.784c-.009-.684-.08-1.265-.212-1.743s-.314-.873-.547-1.183zM51.5 39V13.978c0-.766-.092-1.333-.55-1.792L39.313.55A1.891 1.891 0 0037.985 0H8.963C7.777 0 6.5.916 6.5 2.926V39h45zm-22-6a1 1 0 11-2 0v-3a1 1 0 112 0v3zm8-29.609c0-.458.553-.687.877-.363l10.095 10.095a.513.513 0 01-.363.877H37.5V3.391zM36.5 24v-4c0-.551-.448-1-1-1a1 1 0 110-2c1.654 0 3 1.346 3 3v4c0 1.103.897 2 2 2a1 1 0 110 2c-1.103 0-2 .897-2 2v4c0 1.654-1.346 3-3 3a1 1 0 110-2c.552 0 1-.449 1-1v-4c0-1.2.542-2.266 1.382-3a3.975 3.975 0 01-1.382-3zm-8-2a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0128.5 22zm-12 4c1.103 0 2-.897 2-2v-4c0-1.654 1.346-3 3-3a1 1 0 110 2c-.552 0-1 .449-1 1v4c0 1.2-.542 2.266-1.382 3 .84.734 1.382 1.8 1.382 3v4c0 .551.448 1 1 1a1 1 0 110 2c-1.654 0-3-1.346-3-3v-4c0-1.103-.897-2-2-2a1 1 0 110-2z"></path>
      <path d="M6.5 41v15c0 1.009 1.22 2 2.463 2h40.074c1.243 0 2.463-.991 2.463-2V41h-45zm11.521 10.566c0 .474-.087.873-.26 1.196s-.405.583-.697.779-.627.333-1.005.41a5.845 5.845 0 01-1.169.116c-.2 0-.436-.021-.704-.062s-.547-.104-.834-.191-.563-.185-.827-.294-.487-.232-.67-.369l.697-1.107c.091.063.221.13.39.198s.354.132.554.191.41.111.629.157.424.068.615.068c.483 0 .868-.094 1.155-.28s.439-.504.458-.95v-7.711h1.668v7.849zm7.937.732c-.15.342-.362.643-.636.902s-.61.467-1.012.622-.856.232-1.367.232c-.219 0-.444-.012-.677-.034s-.467-.062-.704-.116c-.237-.055-.463-.13-.677-.226s-.398-.212-.554-.349l.287-1.176c.128.073.289.144.485.212s.398.132.608.191.419.107.629.144.405.055.588.055c.556 0 .982-.13 1.278-.39s.444-.645.444-1.155c0-.31-.104-.574-.314-.793s-.472-.417-.786-.595-.654-.355-1.019-.533-.706-.388-1.025-.629-.583-.526-.793-.854-.314-.738-.314-1.23c0-.446.082-.843.246-1.189s.385-.641.663-.882.602-.426.971-.554.759-.191 1.169-.191c.419 0 .843.039 1.271.116s.774.203 1.039.376c-.055.118-.118.248-.191.39l-.205.396c-.063.123-.118.226-.164.308s-.073.128-.082.137c-.055-.027-.116-.063-.185-.109s-.166-.091-.294-.137-.296-.077-.506-.096-.479-.014-.807.014c-.183.019-.355.07-.52.157s-.31.193-.438.321-.228.271-.301.431-.109.313-.109.458c0 .364.104.658.314.882s.47.419.779.588.647.333 1.012.492.704.354 1.019.581.576.513.786.854.314.781.314 1.319c.004.365-.072.718-.222 1.06zm9.803-1.142c-.214.647-.511 1.185-.889 1.613s-.82.752-1.326.971-1.06.328-1.661.328-1.155-.109-1.661-.328-.948-.542-1.326-.971-.675-.966-.889-1.613-.321-1.395-.321-2.242.107-1.593.321-2.235.511-1.178.889-1.606.82-.754 1.326-.978 1.06-.335 1.661-.335 1.155.111 1.661.335.948.549 1.326.978.675.964.889 1.606.321 1.388.321 2.235-.107 1.595-.321 2.242zM45.68 54h-1.668l-3.951-6.945V54h-1.668V43.924h1.668l3.951 6.945v-6.945h1.668V54z"></path>
    </svg>
  );
};

export const PythonIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 64 64"
    >
      <path
        fill="url(#a)"
        d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 110 2.79 1.393 1.393 0 01-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
      ></path>
      <path
        fill="url(#b)"
        d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 01-1.395-1.395 1.394 1.394 0 111.395 1.395z"
      ></path>
      <defs>
        <linearGradient
          id="a"
          x1="19.075"
          x2="34.898"
          y1="18.782"
          y2="34.658"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#387EB8"></stop>
          <stop offset="1" stopColor="#366994"></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="28.809"
          x2="45.803"
          y1="28.882"
          y2="45.163"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE052"></stop>
          <stop offset="1" stopColor="#FFC331"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function DiscordIcon({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      className={`size-4 ${className}`}
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.075 1.826a.48.48 0 00-.127-.003c-.841.091-2.121.545-2.877.955a.48.48 0 00-.132.106c-.314.359-.599.944-.822 1.498C.887 4.95.697 5.55.59 5.984.236 7.394.043 9.087.017 10.693a.48.48 0 00.056.23c.3.573.947 1.104 1.595 1.492.655.393 1.42.703 2.036.763a.48.48 0 00.399-.153c.154-.167.416-.557.614-.86.09-.138.175-.27.241-.375.662.12 1.492.19 2.542.19 1.048 0 1.878-.07 2.54-.19.066.106.15.237.24.374.198.304.46.694.615.861a.48.48 0 00.399.153c.616-.06 1.38-.37 2.035-.763.648-.388 1.295-.919 1.596-1.492a.48.48 0 00.055-.23c-.025-1.606-.219-3.3-.571-4.71a12.98 12.98 0 00-.529-1.601c-.223-.554-.508-1.14-.821-1.498a.48.48 0 00-.133-.106c-.755-.41-2.035-.864-2.877-.955a.48.48 0 00-.126.003 1.18 1.18 0 00-.515.238 2.905 2.905 0 00-.794.999A14.046 14.046 0 007.5 3.02c-.402 0-.774.015-1.117.042a2.905 2.905 0 00-.794-.998 1.18 1.18 0 00-.514-.238zm5.943 9.712a23.136 23.136 0 00.433.643c.396-.09.901-.3 1.385-.59.543-.325.974-.7 1.182-1.017-.033-1.506-.219-3.07-.54-4.358a12.046 12.046 0 00-.488-1.475c-.2-.498-.415-.92-.602-1.162-.65-.337-1.675-.693-2.343-.79a.603.603 0 00-.058.04 1.5 1.5 0 00-.226.22c-.041.05-.08.098-.113.145.305.056.577.123.818.197.684.21 1.177.5 1.418.821a.48.48 0 11-.768.576c-.059-.078-.316-.29-.932-.48-.595-.182-1.47-.328-2.684-.328-1.214 0-2.09.146-2.684.329-.616.19-.873.4-.932.479a.48.48 0 11-.768-.576c.241-.322.734-.61 1.418-.82.24-.075.512-.141.816-.197a2.213 2.213 0 00-.114-.146 1.5 1.5 0 00-.225-.22.604.604 0 00-.059-.04c-.667.097-1.692.453-2.342.79-.188.243-.402.664-.603 1.162-.213.53-.39 1.087-.487 1.475-.322 1.288-.508 2.852-.54 4.358.208.318.638.692 1.181 1.018.485.29.989.5 1.386.589a16.32 16.32 0 00.433-.643c-.785-.279-1.206-.662-1.48-1.072a.48.48 0 01.8-.532c.26.392.944 1.086 4.2 1.086 3.257 0 3.94-.694 4.2-1.086a.48.48 0 01.8.532c-.274.41-.696.794-1.482 1.072zM4.08 7.012c.244-.262.575-.41.92-.412.345.002.676.15.92.412.243.263.38.618.38.988s-.137.725-.38.988c-.244.262-.575.41-.92.412a1.263 1.263 0 01-.92-.412A1.453 1.453 0 013.7 8c0-.37.137-.725.38-.988zM10 6.6c-.345.002-.676.15-.92.412-.243.263-.38.618-.38.988s.137.725.38.988c.244.262.575.41.92.412.345-.002.676-.15.92-.412.243-.263.38-.618.38-.988s-.137-.725-.38-.988a1.263 1.263 0 00-.92-.412z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function TwitterIcon({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      className={`size-4 ${className}`}
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.233 4.696c0-1.727 1.4-3.127 3.127-3.127 1.014 0 1.823.479 2.365 1.175a5.246 5.246 0 001.626-.629 2.634 2.634 0 01-1.148 1.45l.002.003a5.26 5.26 0 001.5-.413l-.001.002c-.337.505-.76.95-1.248 1.313.026.177.04.354.04.53 0 3.687-2.809 7.975-7.975 7.975a7.93 7.93 0 01-4.296-1.26.5.5 0 01-.108-.748.45.45 0 01.438-.215c.916.108 1.83-.004 2.637-.356a3.086 3.086 0 01-1.69-1.876.45.45 0 01.103-.448 3.07 3.07 0 01-1.045-2.31v-.034a.45.45 0 01.365-.442 3.068 3.068 0 01-.344-1.416c0-.468.003-1.058.332-1.59a.45.45 0 01.323-.208.5.5 0 01.538.161 6.964 6.964 0 004.46 2.507v-.044zm-1.712 7.279a6.936 6.936 0 01-2.249-.373 5.318 5.318 0 002.39-1.042.45.45 0 00-.27-.804 2.174 2.174 0 01-1.714-.888c.19-.015.376-.048.556-.096a.45.45 0 00-.028-.876 2.18 2.18 0 01-1.644-1.474c.2.048.409.077.623.084a.45.45 0 00.265-.824A2.177 2.177 0 012.48 3.87c0-.168.003-.317.013-.453a7.95 7.95 0 005.282 2.376.5.5 0 00.513-.61 2.127 2.127 0 012.071-2.614c1.234 0 2.136 1.143 2.136 2.432 0 3.256-2.476 6.974-6.975 6.974z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export { CopyIcon, DiscordIcon, TrashIcon, TwitterIcon, UploadIcon };
