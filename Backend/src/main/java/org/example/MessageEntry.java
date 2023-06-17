package org.example;

import java.util.Date;

public class MessageEntry {
    private Integer mId;
    private String mUidSender;
    private String mUidReceiver;
    private String mMessage;
    private Date mTimestamp;

    private static int sNextId = 1;

    public MessageEntry(String aUidSender, String aUidReceiver, String aMessage) {
        mId = sNextId++;
        mUidSender = aUidSender;
        mUidReceiver = aUidReceiver;
        mMessage = aMessage;
        mTimestamp = new Date();

    }

    public void update(String aUidSender, String aUidReceiver, String aMessage) {
        mUidSender = aUidSender;
        mUidReceiver = aUidReceiver;
        mMessage = aMessage;
    }

    public Integer getmId() {
        return mId;
    }

    public Date getTimestampe() {
        return mTimestamp;
    }

    @Override
    public String toString() {
        return ("{\n\t\"Messag\": {\n\t\t\"id\":" + mId + "\n\t\t\"UidSender\":" + mUidSender
                + "\n\t\t\"UidReceiver\":\""
                + mUidReceiver + "\n\t\t\"Message\":\"" + mMessage + "\n\t\t\"Timestamp\":\"" + mTimestamp
                + "\"\n\t}\n}");
    }
}
