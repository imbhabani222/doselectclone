export const data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    key: i,
    name: `Assembler 32 (Mars 4.5) ${i}`,
    version: "Elixir 1.12.0 (compiled with Erlang/OTP 24)",
    Tl: 32,
    LA: `JSON and Math Lib`,
    Mu: `512`
  });
}

export const dataSER = [
  {
    name: "AC",
    description: "Your code executed without any issues during an interactive run.",
    status: true
  },
  {
    name: "AC/Ok",
    description: "Your code executed without any issues during an interactive run.",
    status: true
  },
  {
    name: "NZEC",
    description: "Your code executed without any issues during an interactive run."
  },
  {
    name: "NZEC",
    description:
      "Runtime error. This can be caused due to various reasons like improper handling of input, segmentation fault, or anything that might cause an unhandled expection. For instance, if you forgot to return 0 in main function for C or C++."
  },
  {
    name: "TLE",
    description: "Your code executed without any issues during an interactive run."
  },
  {
    name: "NZEC",
    description:
      "Runtime error. This can be caused due to various reasons like improper handling of input, segmentation fault, or anything that might cause an unhandled expection. For instance, if you forgot to return 0 in main function for C or C++."
  },
  {
    name: "TLE",
    description: "Your code executed without any issues during an interactive run."
  }
];
