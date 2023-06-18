package org.example;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class TenterResscource {

    private Map<Integer, UserEntry> mUserEntries;
    private Map<Integer, ChatEntry> mChatEntries;
    private Map<Integer, LikeEntry> mLikeEntries;

    public TenterResscource() {
        mUserEntries = new HashMap<Integer, UserEntry>();
        mUserEntries.put(1, new UserEntry(null,"John", "Smith", new Date(), 28, "https://cdn.thewirecutter.com/wp-content/media/2022/07/carfamilycampingtents-2048px-0313-3x2-1.jpg"));
        mUserEntries.put(2, new UserEntry(null,"Bob", "Smith", new Date(), 23, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH5bDkLDmjjaQsJ4i4OzVekM8Z1JMZyC7XcQ&usqp=CAU"));
        mUserEntries.put(3, new UserEntry(null, "Emily", "Davis", new Date(), 35, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrOvYxBGaN24S-skspJ2U8VYc5vofi-Cdavg&usqp=CAU"));

        mChatEntries = new HashMap<Integer, ChatEntry>();
        mLikeEntries = new HashMap<Integer, LikeEntry>();
    }

    //POST--------------------------------------------------------------------------------------------------------------------------------

    // Endpoint for creating an entry for a specific entry class
    @RequestMapping(method = RequestMethod.POST, value = "/user-entries", produces = MediaType.APPLICATION_JSON)
    public UserEntry createUserEntry(@RequestBody UserEntry entry) {
        if (!mUserEntries.containsKey(entry.getmId())) {
            mUserEntries.put(entry.getmId(), entry);
            return entry;
        } else {
            throw new IllegalArgumentException("id in use " + entry.getmId());
        }
    }

    // Endpoint for creating a chat entry
    @RequestMapping(method = RequestMethod.POST, value = "/chat-entries", produces = MediaType.APPLICATION_JSON)
    public ChatEntry createChatEntry(@RequestBody ChatEntry entry) {
        if (!mChatEntries.containsKey(entry.getmId())) {
            mChatEntries.put(entry.getmId(), entry);
            return entry;
        } else {
            throw new IllegalArgumentException("id in use " + entry.getmId());
        }
    }


    // Endpoint for creating a like entry
    @RequestMapping(method = RequestMethod.POST, value = "/like-entries", produces = MediaType.APPLICATION_JSON)
    public LikeEntry createLikeEntry(@RequestBody LikeEntry entry) {
         if (!mLikeEntries.containsKey(entry.getmId())) {
            mLikeEntries.put(entry.getmId(), entry);
            return entry;
        } else {
            throw new IllegalArgumentException("id in use " + entry.getmId());
        }
    }

    //GET-----------------------------------------------------------------------------------------------------------------
    /* 
    @RequestMapping(method = RequestMethod.GET, value = "/entries", produces = MediaType.APPLICATION_JSON)
    public Map<Integer, UserEntry> readNotes() {
        return mUserEntries;
    }
    */
    @RequestMapping(method = RequestMethod.GET, value = "/user-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public UserEntry readNote(@PathVariable("id") Integer aId) {
        // Implement the logic to retrieve the UserEntry with the given ID
        if (mUserEntries.containsKey(aId)) {
            return mUserEntries.get(aId);
        } else {
            throw new IllegalArgumentException("Invalid user ID: " + aId);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/chat-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public ChatEntry getChatEntry(@PathVariable("id") Integer id) {
        if (mChatEntries.containsKey(id)) {
            return mChatEntries.get(id);
        } else {
            throw new IllegalArgumentException("Invalid chat ID: " + id);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/like-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public LikeEntry getLikeEntry(@PathVariable("id") Integer id) {
        if (mLikeEntries.containsKey(id)) {
            return mLikeEntries.get(id);
        } else {
            throw new IllegalArgumentException("Invalid like ID: " + id);
        }
    }

    //PUT------------------------------------------------------------------------------------------------------------------------------

    @RequestMapping(method = RequestMethod.PUT, value = "/user-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public UserEntry updateUserEntry(@PathVariable("id") Integer id, @RequestBody UserEntry entry) {
        if (mUserEntries.containsKey(id)) {
            UserEntry existingEntry = mUserEntries.get(id);
            existingEntry.update(entry.getmFname(), entry.getmLname(), entry.getmAge(), entry.getmAgePref(), entry.getmPicture());
            return existingEntry;
        } else {
            throw new IllegalArgumentException("Invalid user ID: " + id);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/chat-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public ChatEntry updateChatEntry(@PathVariable("id") Integer id, @RequestBody ChatEntry entry) {
        if (mChatEntries.containsKey(id)) {
            ChatEntry existingEntry = mChatEntries.get(id);
            existingEntry.update(entry.getmUidSender(), entry.getmUidReceiver(), entry.getmMessage());
            return existingEntry;
        } else {
            throw new IllegalArgumentException("Invalid chat ID: " + id);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/like-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public LikeEntry updateLikeEntry(@PathVariable("id") Integer id, @RequestBody LikeEntry entry) {
        if (mLikeEntries.containsKey(id)) {
            LikeEntry existingEntry = mLikeEntries.get(id);
            existingEntry.update(entry.getmId(), entry.getmUidLiker(), entry.getmUidLiked());
            return existingEntry;
        } else {
            throw new IllegalArgumentException("Invalid like ID: " + id);
        }
    }

    //DELET--------------------------------------------------------------------------------------------------------------

    @RequestMapping(method = RequestMethod.DELETE, value = "/user-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public void deleteUserEntry(@PathVariable("id") Integer id) {
        if (mUserEntries.containsKey(id)) {
            mUserEntries.remove(id);
        } else {
            throw new IllegalArgumentException("Invalid user ID: " + id);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/chat-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public void deleteChatEntry(@PathVariable("id") Integer id) {
        if (mChatEntries.containsKey(id)) {
            mChatEntries.remove(id);
        } else {
            throw new IllegalArgumentException("Invalid chat ID: " + id);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/like-entries/{id}", produces = MediaType.APPLICATION_JSON)
    public void deleteLikeEntry(@PathVariable("id") Integer id) {
        if (mLikeEntries.containsKey(id)) {
            mLikeEntries.remove(id);
        } else {
            throw new IllegalArgumentException("Invalid like ID: " + id);
        }
    }

    @ExceptionHandler
    public void handleIllegalArgunmntException(IllegalArgumentException aExcpetion, HttpServletResponse aResponse)
            throws IOException {
        aResponse.sendError(HttpStatus.BAD_REQUEST.value(), aExcpetion.toString());
    }

}