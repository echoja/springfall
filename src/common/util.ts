import dayjsLib from "dayjs";
import "dayjs/locale/ko"; // import locale
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin

dayjsLib.extend(relativeTime); // use plugin
dayjsLib.locale("ko"); // use locale
