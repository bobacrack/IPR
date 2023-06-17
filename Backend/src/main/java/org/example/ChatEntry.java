package org.example;

public class ChatEntry {
    private Integer mId;
    private String mUidSender;
    private String mUidReceiver;

    private static int sNextId = 1;

    public ChatEntry(String aUidSender, String aUidReceiver) {
        mId = sNextId++;
        mUidSender = aUidSender;
        mUidReceiver = aUidReceiver;

    }

    public void update(String aUidSender, String aUidReceiver) {
        mUidSender = aUidSender;
        mUidReceiver = aUidReceiver;
    }

    public Integer getmId() {
        return mId;
    }

    @Override
    public String toString() {
        return ("{\n\t\"chat\": {\n\t\t\"id\":" + mId + "\n\t\t\"UidSender\":" + mUidSender + "\n\t\t\"UidReceiver\":\""
                + mUidReceiver
                + "\"\n\t}\n}");
    }
}
