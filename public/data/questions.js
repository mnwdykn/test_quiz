const questions = [
  {
    question: "現在の作業ディレクトリを表示するコマンドは？",
    options: ["cd", "ls", "pwd", "mkdir"],
    answerIndex: 2,
  },
  {
    question: "ファイルの中身を表示するコマンドは？",
    options: ["cat", "touch", "rm", "cp"],
    answerIndex: 0,
  },
  {
    question: "新しい空のファイルを作成するコマンドは？",
    options: ["mkdir", "touch", "nano", "less"],
    answerIndex: 1,
  },
  {
    question: "ファイルをコピーするコマンドは？",
    options: ["mv", "cp", "rm", "cat"],
    answerIndex: 1,
  },
  {
    question: "ファイルを削除するコマンドは？",
    options: ["cp", "mv", "rm", "touch"],
    answerIndex: 2,
  },
  {
    question: "現在ログイン中のユーザー名を表示するコマンドは？",
    options: ["whoami", "id", "uname", "who"],
    answerIndex: 0,
  },
  {
    question: "システム情報を表示するコマンドは？",
    options: ["uname", "whoami", "top", "df"],
    answerIndex: 0,
  },
  {
    question: "プロセスの一覧を表示するコマンドは？",
    options: ["ps", "top", "htop", "allps"],
    answerIndex: 0,
  },
  {
    question: "ディレクトリを作成するコマンドは？",
    options: ["rmdir", "mkdir", "makedir", "createdir"],
    answerIndex: 1,
  },
  {
    question: "ファイルを移動するコマンドは？",
    options: ["cp", "mv", "move", "transfer"],
    answerIndex: 1,
  },
  {
    question: "ファイルの先頭部分を表示するコマンドは？",
    options: ["head", "tail", "less", "more"],
    answerIndex: 0,
  },
  {
    question: "ファイルの末尾部分を表示するコマンドは？",
    options: ["head", "tail", "more", "less"],
    answerIndex: 1,
  },
  {
    question: "パーミッションを変更するコマンドは？",
    options: ["chmod", "chown", "chgrp", "permset"],
    answerIndex: 0,
  },
  {
    question: "所有者を変更するコマンドは？",
    options: ["chmod", "chgrp", "chown", "ownerchange"],
    answerIndex: 2,
  },
  {
    question: "ファイルシステムのディスク使用量を確認するコマンドは？",
    options: ["df", "du", "lsblk", "mount"],
    answerIndex: 0,
  },
  {
    question: "ファイルやディレクトリのサイズを確認するコマンドは？",
    options: ["df", "du", "lsblk", "mount"],
    answerIndex: 1,
  },
  {
    question: "実行中のサービスを管理するコマンドは？（systemd使用時）",
    options: ["service", "systemctl", "initctl", "svcadm"],
    answerIndex: 1,
  },
  {
    question: "ポートの使用状況を確認するコマンドは？",
    options: ["ss", "ps", "netstat", "lsof"],
    answerIndex: 0,
  },
  {
    question: "ファイルの内容を簡易的に閲覧できるコマンドは？",
    options: ["nano", "less", "vim", "cat"],
    answerIndex: 1,
  },
  {
    question: "ホームディレクトリに移動するコマンドは？",
    options: ["cd ~", "cd home", "goto home", "move ~"],
    answerIndex: 0,
  },
];

export default questions;
